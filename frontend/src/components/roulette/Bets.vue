<template>
    <div class="row">
        <div class="col-sm-4 text-light">
            <table class="table table-dark">
                <thead class="bg-black">
                    <tr>
                        <th><i class="fas fa-user-circle mr-2"></i> Utilisateur</th>
                        <th><i class="fas fa-coins mr-2"></i> Pari</th>
                        <th><i class="fas fa-chart-line mr-2"></i> Gain</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Stead</td>
                        <td>5 000</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Stead</td>
                        <td>5 000</td>
                        <td>+ 8500</td>
                    </tr>
                    <tr>
                        <td>Stead</td>
                        <td>5 000</td>
                        <td> + 8500</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-4 text-light">
            <table class="table table-dark">
                <thead class="bg-red">
                <tr>
                    <th><i class="fas fa-user-circle mr-2"></i> Utilisateur</th>
                    <th><i class="fas fa-coins mr-2"></i> Pari</th>
                    <th><i class="fas fa-chart-line mr-2"></i> Gain</th>
                </tr>
                </thead>
            </table>
        </div>
        <div class="col-sm-4 text-light">
            <table class="table table-dark">
                <thead class="bg-green">
                    <tr>
                        <th><i class="fas fa-user-circle mr-2"></i> Utilisateur</th>
                        <th><i class="fas fa-coins mr-2"></i> Pari</th>
                        <th><i class="fas fa-chart-line mr-2"></i> Gain</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .bg-red {
        background: #e74c3c;
    }

    .border-red {
        border-color: #e74c3c;
    }

    .bg-black {
        background: #222222;
    }

    .border-black {
        border-color: #222222;
    }

    .bg-green {
        background: #2ecc71;
    }

    .border-green {
        border-color: #2ecc71;
    }
</style>